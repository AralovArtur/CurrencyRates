// React
import React, { Component } from "react";

// Ant Design
import { Select, Form, Input, Row, Card, Button, Col, List } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

// Utils
import { openNotificationWithIcon } from "../utils/Widgets";

// Axios
import axios from "axios";

// Constants
import { ACCESS_TOKEN, API_BASE_URL, CURRENCIES } from "../constant";
const { Option } = Select;

class CurrencyRates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyRates: [],
      foundCurrencyRates: [],
      valueFrom: null,
      result: null,
      currencyFrom: "",
      currencyTo: "",
      history: "",
    };

    this.formRef = React.createRef();
    this.handleCurrencyFromChange = this.handleCurrencyFromChange.bind(this);
    this.handleCurrencyToChange = this.handleCurrencyToChange.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  async saveTransaction(currencyFrom, currencyTo) {
    await axios
      .post(
        API_BASE_URL + "/currency_rates/history_transactions",
        {
          currencyFrom: currencyFrom,
          currencyTo: currencyTo,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
          },
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }

  async getCurrencyRates(currencyFrom, currencyTo) {
    await axios
      .post(
        API_BASE_URL + "/currency_rates",
        {
          currencyFrom: currencyFrom,
          currencyTo: currencyTo,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
          },
        }
      )
      .then((response) => {
        console.log(response);
        this.setState({ foundCurrencyRates: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  confirmForm() {
    this.formRef.current.submit();
  }

  async onFinish(values) {
    const { valueFrom, currencyFrom, currencyTo } = values;
    await this.getCurrencyRates(currencyFrom, currencyTo);
    await this.saveTransaction(currencyFrom, currencyTo);
    const { foundCurrencyRates } = this.state;
    const rateFrom = foundCurrencyRates[0].rate;
    const rateTo = foundCurrencyRates[1].rate;

    const result = ((rateTo * parseFloat(valueFrom)) / rateFrom).toFixed(3);
    this.setState({ result: result });
  }

  onFinishFailed = ({ errorFields }) => {
    const errors = this.formRef.current.getFieldsError(
      errorFields.map((errorField) => errorField.name)
    );
    const errorMsg = (
      <List
        size="small"
        dataSource={errors}
        renderItem={(item) => <List.Item>{item.errors}</List.Item>}
      />
    );
    openNotificationWithIcon(
      "error",
      "Error on converting currencies",
      errorMsg
    );
    this.formRef.current.scrollToField(errorFields[0].name);
  };

  handleCurrencyFromChange(value) {
    this.setState({ currencyFrom: value });
  }

  handleCurrencyToChange(value) {
    this.setState({ currencyTo: value });
  }

  render() {
    console.log("state", this.state);

    const currencies = [];
    CURRENCIES.forEach((currency, i) => {
      currencies.push(
        <Option key={"to, " + i} value={currency}>
          {currency}
        </Option>
      );
    });

    const { currencyFrom, currencyTo, result } = this.state;

    return (
      <>
        <Card style={{ marginTop: 50 }}>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Row gutter={[8, 16]} justify="center">
              <Col>
                <Form.Item
                  name="valueFrom"
                  label="Value From"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      pattern: /^\d+\.\d{3}$/,
                      message: "'Value From' is incorrect",
                    },
                  ]}
                >
                  <Input style={{ width: 100 }} placeholder="Value" />
                </Form.Item>
              </Col>

              <Col>
                <Form.Item
                  name="currencyFrom"
                  label="Currency From"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    style={{ width: 100 }}
                    allowClear
                    value={currencyFrom}
                    onChange={this.handleCurrencyFromChange}
                  >
                    {currencies}
                  </Select>
                </Form.Item>
              </Col>

              <Col style={{ marginRight: 50, marginLeft: 50 }}>
                <Button
                  style={{ width: 100 }}
                  icon={<ArrowRightOutlined />}
                  type="primary"
                  htmlType="submit"
                  onClick={() => this.confirmForm}
                >
                  Convert
                </Button>
              </Col>

              <Col>
                <Form.Item
                  name="currencyTo"
                  label="Currency To"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    style={{ width: 100 }}
                    allowClear
                    value={currencyTo}
                    onChange={this.handleCurrencyToChange}
                  >
                    {currencies}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        {result && (
          <Row justify="center">
            <p>Result: {result}</p>
          </Row>
        )}
      </>
    );
  }
}

export default CurrencyRates;
