package hu.elte.alkfejl.enaplo.configuration;

import hu.elte.alkfejl.enaplo.component.CorsFilterComponent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CorsFilterComponent corsFilterComponent;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .csrf().disable() // H2 Console
                .authorizeRequests()
                .antMatchers("/h2/**")
                .permitAll() // H2 Console
                .and()
                .headers()
                .frameOptions()
                .disable(); // H2 Console

        http.addFilterBefore(corsFilterComponent, ChannelProcessingFilter.class);
    }
}