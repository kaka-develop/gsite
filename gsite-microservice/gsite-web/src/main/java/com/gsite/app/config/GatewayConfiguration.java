package com.gsite.app.config;

import com.gsite.app.gateway.accesscontrol.AccessControlFilter;
import com.gsite.app.gateway.responserewriting.SwaggerBasePathRewritingFilter;
import com.gsite.app.web.rest.errors.CustomFallbackProvider;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.cloud.netflix.zuul.filters.RouteLocator;
import org.springframework.cloud.netflix.zuul.filters.route.ZuulFallbackProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableZuulProxy
@EnableCircuitBreaker
public class GatewayConfiguration {

    @Bean
    public ZuulFallbackProvider myFallbackProvider() {
        return new CustomFallbackProvider();
    }

    @Configuration
    public static class SwaggerBasePathRewritingConfiguration {

        @Bean
        public SwaggerBasePathRewritingFilter swaggerBasePathRewritingFilter(){
            return new SwaggerBasePathRewritingFilter();
        }
    }

    @Configuration
    public static class AccessControlFilterConfiguration {

        @Bean
        public AccessControlFilter accessControlFilter(RouteLocator routeLocator, ApplicationProperties applicationProperties){
            return new AccessControlFilter(routeLocator, applicationProperties);
        }
    }

}
