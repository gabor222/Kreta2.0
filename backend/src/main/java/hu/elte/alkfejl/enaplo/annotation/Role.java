package hu.elte.alkfejl.enaplo.annotation;

import hu.elte.alkfejl.enaplo.model.UserModel;

import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Role {
    UserModel.Role[] value() default {
            UserModel.Role.ROLE_GUEST
    };
}