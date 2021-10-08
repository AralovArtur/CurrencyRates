package com.artur.CurrencyRates.payload;

import lombok.Data;

import javax.validation.constraints.*;

@Data
public class SignUpRequest {
    @NotBlank
    @Size(min = 8, max = 100)
    private String name;

    @NotBlank
    @Size(min = 5, max = 15)
    private String username;

    @NotBlank
    @Size(min = 8, max = 40)
    @Email
    private String email;

    @NotBlank
    @Size(min = 8, max = 100)
    private String password;
}
