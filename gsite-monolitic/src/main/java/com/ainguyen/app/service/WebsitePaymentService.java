package com.ainguyen.app.service;

import com.ainguyen.app.config.payment.PayPalAPI;
import com.ainguyen.app.domain.WebTemplate;
import com.ainguyen.app.domain.Website;
import com.paypal.api.payments.CreditCard;
import com.paypal.api.payments.Payment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

@Service
public class WebsitePaymentService {

    private final Logger log = LoggerFactory.getLogger(WebsitePaymentService.class);

    @Inject
    private PayPalAPI payPalAPI;

    @Inject
    private WebTemplateService webTemplateService;

    @Inject
    private WebsiteService websiteService;

    public WebsitePaymentService(){
        // add payment API
    }

    public Payment createPayment(String webId) {
        Website website = websiteService.findOne(webId);
        if(website == null)
            return null;
        WebTemplate template = webTemplateService.findOneBySource(website.getTemplate());
        Payment payment =  payPalAPI.createWebsitePayment(website,template);
        return payment;
    }

    public Payment executePayment(String paymentID, String payerID) {
        return payPalAPI.executePayment(paymentID,payerID);
    }

    public Payment createCreditCardPayment(String webId, CreditCard creditCard) {
        Website website = websiteService.findOne(webId);
        if(website == null)
            return null;
        WebTemplate template = webTemplateService.findOneBySource(website.getTemplate());
        Payment payment =  payPalAPI.createWebsitePaymentWithCard(website,template,creditCard);
        return payment;
    }
}
