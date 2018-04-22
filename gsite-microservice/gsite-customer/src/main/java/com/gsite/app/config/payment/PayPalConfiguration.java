package com.gsite.app.config.payment;

import com.paypal.api.payments.RedirectUrls;
import com.paypal.base.rest.APIContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.inject.Inject;

@Configuration
public class PayPalConfiguration {


    @Inject
    Environment environment;

    @Bean
    public PayPalAPI getAPIContext() {
        String clientId =environment.getProperty("payment.paypal.clientId");
        String clientSecret =environment.getProperty("payment.paypal.clientSecret");
        String mode = environment.getProperty("payment.paypal.mode");
        APIContext apiContext =  new APIContext(clientId, clientSecret, mode);

        String cancelUrl = environment.getProperty("payment.paypal.cancelUrl");
        String returnUrl = environment.getProperty("payment.paypal.returnUrl");

        return new PayPalAPI(apiContext,cancelUrl,returnUrl);
    }
}
