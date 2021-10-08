package com.artur.CurrencyRates.service;

import com.artur.CurrencyRates.entity.CurrencyRate;
import com.artur.CurrencyRates.entity.History;
import com.artur.CurrencyRates.entity.User;
import com.artur.CurrencyRates.entity.dto.ResponseCurrencyDto;
import com.artur.CurrencyRates.repository.CurrencyRateRepository;
import com.artur.CurrencyRates.repository.HistoryRepository;
import com.artur.CurrencyRates.security.CurrentUser;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class CurrencyRateService {

    private final Logger logger = LoggerFactory.getLogger(CurrencyRateService.class);
    private final CurrencyRateRepository currencyRateRepository;
    private final HistoryRepository historyRepository;

    public void saveTransaction(ResponseCurrencyDto responseCurrencyDto, User currentUser) {
        String currencyFrom = responseCurrencyDto.getCurrencyFrom();
        String currencyTo = responseCurrencyDto.getCurrencyTo();
        LocalDate currentDate = LocalDate.now();
        History history = new History(currencyFrom, currencyTo, currentDate, currentUser);
        historyRepository.save(history);
    }

    public List<History> getHistory(User user) {
        List<History> transactions = historyRepository.findByUserId(user.getId());
        return transactions;
    }

    public List<CurrencyRate> getCurrencyRatesFRomDb(ResponseCurrencyDto responseCurrencyDto) {
        String currencyFrom = responseCurrencyDto.getCurrencyFrom();
        String currencyTo = responseCurrencyDto.getCurrencyTo();
        CurrencyRate currencyRateFromByDate = currencyRateRepository.findByCurrencyAndLocalDate(currencyFrom, LocalDate.now()).orElse(null);
        CurrencyRate currencyRateToByDate = currencyRateRepository.findByCurrencyAndLocalDate(currencyTo, LocalDate.now()).orElse(null);

        // From DB
        if (Objects.nonNull(currencyRateFromByDate) && Objects.nonNull(currencyRateToByDate)) {
            return List.of(currencyRateFromByDate, currencyRateToByDate);
        } else {
            return getCurrencyRates(currencyFrom, currencyTo);
        }
    }

    public List<CurrencyRate> getCurrencyRates(String currencyFrom, String currencyTo) {
        try {
            List<CurrencyRate> foundCurrencyRates = new ArrayList<>();

            String URL = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(URL);

            // Normalize XML response
            document.getDocumentElement().normalize();
            NodeList nodeList = document.getElementsByTagName("Cube");
            Node nodeDate = nodeList.item(1);
            Element elementDate = (Element) nodeDate;
            LocalDate currentDate = LocalDate.parse(elementDate.getAttribute("time"));
            NodeList childNodes = nodeList.item(1).getChildNodes();
            for (int i = 0; i < childNodes.getLength(); i++) {
                Node node = childNodes.item(i);
                if(node.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) node;
                    String currency = element.getAttribute("currency");

                    // Look if exists in DB
                    CurrencyRate currencyRate = currencyRateRepository.findByCurrency(currency).orElse(null);
                    String rate = element.getAttribute("rate");
                    if (Objects.nonNull(currencyRate)) {
                        currencyRate.setRate(Double.parseDouble(rate));
                        currencyRate.setLocalDate(currentDate);
                        currencyRateRepository.save(currencyRate);
                    } else {
                        currencyRate = new CurrencyRate(currency, Double.parseDouble(rate), currentDate);
                        currencyRateRepository.save(currencyRate);
                    }

                    if (currencyFrom.equals(currency)) {
                        foundCurrencyRates.add(currencyRate);
                    }

                    if (currencyTo.equals(currency)) {
                        foundCurrencyRates.add(currencyRate);
                    }
                }
            }

            // Insert euro currency
            CurrencyRate currencyRate = new CurrencyRate("EUR", 1, currentDate);
            currencyRateRepository.save(currencyRate);

            if (currencyFrom.equals("EUR")) {
                foundCurrencyRates.add(currencyRate);
            }

            if (currencyTo.equals("EUR")) {
                foundCurrencyRates.add(currencyRate);
            }

            return foundCurrencyRates;
        } catch (Exception exception) {
            logger.error(exception.getMessage());
        }
        return null;
    }

}
