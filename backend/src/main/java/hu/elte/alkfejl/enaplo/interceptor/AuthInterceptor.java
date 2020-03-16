package hu.elte.alkfejl.enaplo.interceptor;

import hu.elte.alkfejl.enaplo.annotation.Role;
import hu.elte.alkfejl.enaplo.model.UserModel;
import hu.elte.alkfejl.enaplo.service.SessionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
public class AuthInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private SessionService session;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        List<UserModel.Role> routeRoles = getRoles((HandlerMethod) handler);
        UserModel user = session.getUser();

        // when there are no restrictions, we let the user through
        if (routeRoles.isEmpty() || routeRoles.contains(UserModel.Role.ROLE_GUEST)) {
            return true;
        }

        // check role
        if (user != null && routeRoles.contains(user.getRole())) {
            return true;
        }

        response.setStatus(401);
        return false;
    }

    private List<UserModel.Role> getRoles(HandlerMethod handler) {
        Role role = handler.getMethodAnnotation(Role.class);
        return role == null ? Collections.emptyList() : Arrays.asList(role.value());
    }
}