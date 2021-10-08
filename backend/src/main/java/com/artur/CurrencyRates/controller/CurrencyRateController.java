package com.artur.CurrencyRates.controller;

import com.artur.CurrencyRates.entity.CurrencyRate;
import com.artur.CurrencyRates.entity.History;
import com.artur.CurrencyRates.entity.User;
import com.artur.CurrencyRates.entity.dto.ResponseCurrencyDto;
import com.artur.CurrencyRates.repository.CurrencyRateRepository;
import com.artur.CurrencyRates.repository.HistoryRepository;
import com.artur.CurrencyRates.repository.UserRepository;
import com.artur.CurrencyRates.security.CurrentUser;
import com.artur.CurrencyRates.service.CurrencyRateService;
import com.artur.CurrencyRates.service.UserPrincipal;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/currency_rates")
@AllArgsConstructor
public class CurrencyRateController {

    private final CurrencyRateService currencyRateService;
    private final CurrencyRateRepository currencyRateRepository;
    private final HistoryRepository historyRepository;
    private final UserRepository userRepository;

    @PostMapping
    public List<CurrencyRate> getCurrencyRates(@RequestBody ResponseCurrencyDto responseCurrencyDto) {
        List<CurrencyRate> currencyRates = currencyRateService.getCurrencyRatesFRomDb(responseCurrencyDto);
        return currencyRates;
    }

    @PostMapping("/history_transactions")
    public void saveTransaction(@CurrentUser UserPrincipal currentUser, @RequestBody ResponseCurrencyDto responseCurrencyDto) {
        User user = userRepository.getById(currentUser.getId());
        currencyRateService.saveTransaction(responseCurrencyDto, user);
    }


    @GetMapping("/history_transactions")
    public List<History> getHistory(@CurrentUser UserPrincipal currentUser) {
        User user = userRepository.getById(currentUser.getId());
        List<History> history = currencyRateService.getHistory(user);
        return history;
    }

}
