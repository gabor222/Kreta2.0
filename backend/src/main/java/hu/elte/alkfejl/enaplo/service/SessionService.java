package hu.elte.alkfejl.enaplo.service;

import hu.elte.alkfejl.enaplo.model.UserModel;

import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

@Data
@Service
@SessionScope
public class SessionService {
    private UserModel user;
}