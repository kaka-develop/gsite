package com.gsite.app.service;

import com.gsite.app.config.payment.PayPalAPI;
import com.gsite.app.domain.WebTemplate;
import com.gsite.app.domain.Website;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.paypal.api.payments.CreditCard;
import com.paypal.api.payments.Payment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.inject.Inject;

@Service
public class WebsitePaymentService {

    private final Logger log = LoggerFactory.getLogger(WebsitePaymentService.class);

    @Inject
    private PayPalAPI payPalAPI;

    @Inject
    private WebTemplateService webTemplateService;

    @Inject
    private WebsiteService websiteService;

    public WebsitePaymentService() {
        // add payment API
    }

    @HystrixCommand(fallbackMethod = "fallBackSingle")
    public Payment createPayment(String webId) {
        Website website = websiteService.findOne(webId);
        if (website == null)
            return null;
        WebTemplate template = webTemplateService.findOneBySource(website.getTemplate());
        Payment payment = payPalAPI.createWebsitePayment(website, template);
        return payment;
    }

    @HystrixCommand(fallbackMethod = "fallBackSingle")
    public Payment executePayment(String paymentID, String payerID) {
        return payPalAPI.executePayment(paymentID, payerID);
    }

    @HystrixCommand(fallbackMethod = "fallBackSingle")
    public Payment createCreditCardPayment(String webId, CreditCard creditCard) {
        Website website = websiteService.findOne(webId);
        if (website == null)
            return null;
        WebTemplate template = webTemplateService.findOneBySource(website.getTemplate());
        Payment payment = payPalAPI.createWebsitePaymentWithCard(website, template, creditCard);
        return payment;
    }


    public Payment fallBackSingle(String param) {
        return null;
    }

    public Payment fallBackSingle(String param, String param2) {
        return null;
    }

    public Payment fallBackSingle(String param, CreditCard creditCard) {
        return null;
    }
}
