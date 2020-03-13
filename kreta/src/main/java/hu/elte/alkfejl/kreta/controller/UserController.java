package hu.elte.alkfejl.kreta.controller;

import hu.elte.alkfejl.kreta.repository.UserRepository;
import hu.elte.alkfejl.kreta.repository.GroupRepository;
import hu.elte.alkfejl.kreta.model.User;
import hu.elte.alkfejl.kreta.model.Subject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("")
    public ResponseEntity<Iterable<User>> findAll() {
        Iterable<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Optional<User>> findById(@PathVariable Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{userId}/subjects")
    public ResponseEntity getSubjects(@PathVariable Integer userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Iterable<Subject> subjects = user.getSubjects();
            return ResponseEntity.ok(subjects);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("")
    public ResponseEntity<User> post(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User saved = userRepository.save(user);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<User> update(@PathVariable Integer userId, @RequestBody User user) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User current = optionalUser.get();
            current.setUserName(user.getUserName());
            current.setRealName(user.getRealName());
            current.setGroup(user.getGroup());
            User saved = userRepository.save(current);
            return ResponseEntity.ok(saved);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity delete(@PathVariable Integer userId) {
        Optional<User> optional = userRepository.findById(userId);
        if (optional.isPresent()) {
            userRepository.deleteById(userId);
            Iterable<User> users = userRepository.findAll();
            return ResponseEntity.ok(users);
        }
        return ResponseEntity.notFound().build();
    }
}
