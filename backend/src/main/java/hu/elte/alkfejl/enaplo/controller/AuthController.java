package hu.elte.alkfejl.enaplo.controller;

import java.util.Optional;

import hu.elte.alkfejl.enaplo.model.UserModel;
import hu.elte.alkfejl.enaplo.repository.UserRepository;
import hu.elte.alkfejl.enaplo.service.SessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    SessionService session;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @RequestMapping("/login")
    public ResponseEntity<UserModel> login(@RequestBody UserModel userFromRequest) {
        Optional<UserModel> userFromDB = userRepository.findByUserName(userFromRequest.getUserName());

        if (userFromDB.isPresent() && passwordEncoder.matches(userFromRequest.getPassword(), userFromDB.get().getPassword())) {
            session.setUser(userFromDB.get());
            return ResponseEntity.ok(userFromDB.get());
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    @RequestMapping("/logout")
    public ResponseEntity logout() {
        session.setUser(null);
        return ResponseEntity.ok(false);
    }

    @GetMapping("/user")
    public ResponseEntity getUser() {
        if (session.getUser() == null) {
            return ResponseEntity.ok(false);
        } else {
            return ResponseEntity.ok(session.getUser());
        }
    }
}