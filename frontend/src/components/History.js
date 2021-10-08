import { Component } from "react";
import { Table } from "antd";
import axios from "axios";
import { ACCESS_TOKEN, API_BASE_URL, CURRENCIES } from "../constant/index";

const currencyFilters = CURRENCIES.map((currency) => {
  return { text: currency, value: currency };
});

const columns = [
  {
    title: "From currency",
    dataIndex: "from_currency",
    key: "from_currency",
    filters: currencyFilters,
    onFilter: (value, record) => {
      return record.from_currency === value;
    },
  },
  {
    title: "To currency",
    dataIndex: "to_currency",
    key: "to_currency",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    sorter: (firstDate, secondDare) => {
      return firstDate.date > secondDare.date;
    },
  },
];

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      pageSize: 10,
    };
  }

  async getHistory() {
    await axios
      .get(API_BASE_URL + "/currency_rates/history_transactions", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
        },
      })
      .then((response) => {
        console.log(response.data);
        const history = response.data.map((transaction, index) => {
          return {
            key: index,
            from_currency: transaction.currencyFrom,
            to_currency: transaction.currencyTo,
            date: transaction.localDate,
          };
        });
        this.setState({ history: history });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async componentDidMount() {
    await this.getHistory();
  }

  render() {
    return <Table columns={columns} dataSource={this.state.history} />;
  }
}

export default History;
