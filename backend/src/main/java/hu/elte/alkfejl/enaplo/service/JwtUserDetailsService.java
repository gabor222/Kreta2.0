package hu.elte.alkfejl.enaplo.service;

import java.util.Collection;
import java.util.Optional;

import hu.elte.alkfejl.enaplo.model.UserModel;
import hu.elte.alkfejl.enaplo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserModel> optionalUser = userRepository.findByUserName(email);
        if (optionalUser.isPresent()) {
            return new User(optionalUser.get().getUserName(), optionalUser.get().getPassword(), getAuthorities(optionalUser.get()));
        } else {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
    }

    private Collection<? extends GrantedAuthority> getAuthorities(UserModel user) {
        Collection<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(user.getRole().toString());
        return authorities;
    }

}
