package hu.elte.alkfejl.enaplo.model.jwt;

import java.io.Serializable;

public class JwtRequest implements Serializable {
    private static final long serialVersionUID = 5926468583005150707L;
    private String emailAddress;
    private String password;

    // Need default constructor for JSON Parsing
    public JwtRequest() { }

    public JwtRequest(String username, String password, String role) {
        this.setEmailAddress(username);
        this.setPassword(password);
    }

    public String getEmailAddress() {
        return this.emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}