package hu.elte.alkfejl.enaplo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import hu.elte.alkfejl.enaplo.configuration.JwtTokenUtil;
import hu.elte.alkfejl.enaplo.model.UserModel;
import hu.elte.alkfejl.enaplo.model.jwt.JwtRequest;
import hu.elte.alkfejl.enaplo.repository.UserRepository;
import hu.elte.alkfejl.enaplo.service.JwtUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class JwtAuthenticationController {
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtTokenUtil jwtTokenUtil;
    @Autowired private JwtUserDetailsService userDetailsService;
    @Autowired private UserRepository userRepository;

    @RequestMapping(value = "/api/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        authenticate(authenticationRequest.getEmailAddress(), authenticationRequest.getPassword());
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmailAddress());
        final String token = jwtTokenUtil.generateToken(userDetails);
        Optional<UserModel> optionalUser = userRepository.findByUserName(authenticationRequest.getEmailAddress());
        HashMap<String, Object> map = new HashMap<>();
        map.put("token", token);
        map.put("user", optionalUser.get());
        return ResponseEntity.ok(map);
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            List authorities = new ArrayList<>();
            //authorities.add(role);
            //authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password, authorities));
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}