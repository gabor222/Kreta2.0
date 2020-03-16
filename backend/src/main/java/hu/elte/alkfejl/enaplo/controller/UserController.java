package hu.elte.alkfejl.enaplo.controller;

import com.fasterxml.jackson.databind.util.ArrayIterator;
import hu.elte.alkfejl.enaplo.model.*;
import hu.elte.alkfejl.enaplo.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("")
    public ResponseEntity<Iterable<UserModel>> findAll() {
        Iterable<UserModel> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Optional<UserModel>> findById(@PathVariable Integer userId) {
        Optional<UserModel> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{userId}/subjects")
    public ResponseEntity getSubjects(@PathVariable Integer userId) {
        Optional<UserModel> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            UserModel user = optionalUser.get();
            List<SubjectModel> subjects = user.getSubjects();
            // Le kell szűkíteni minden tárgyhoz a jegyeket az adott diákra
            // Kicsit félmegoldás, de működik
            subjects.stream().forEach(s ->
                s.setMarks(
                    s.getMarks().stream().filter(m ->
                        m.getStudentUserId() == userId
                    ).collect(Collectors.toList())
                )
            );
            return ResponseEntity.ok(subjects);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("")
    public ResponseEntity<UserModel> post(@RequestBody UserModel user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserModel saved = userRepository.save(user);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserModel> update(@PathVariable Integer userId, @RequestBody UserModel user) {
        Optional<UserModel> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            UserModel current = optionalUser.get();
            current.setUserName(user.getUserName());
            current.setRealName(user.getRealName());
            current.setClassModel(user.getClassModel());
            UserModel saved = userRepository.save(current);
            return ResponseEntity.ok(saved);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity delete(@PathVariable Integer userId) {
        Optional<UserModel> optional = userRepository.findById(userId);
        if (optional.isPresent()) {
            userRepository.deleteById(userId);
            Iterable<UserModel> users = userRepository.findAll();
            return ResponseEntity.ok(users);
        }
        return ResponseEntity.notFound().build();
    }
}
