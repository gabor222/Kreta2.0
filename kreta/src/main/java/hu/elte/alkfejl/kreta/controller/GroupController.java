package hu.elte.alkfejl.kreta.controller;

import hu.elte.alkfejl.kreta.repository.UserRepository;
import hu.elte.alkfejl.kreta.repository.GroupRepository;
import hu.elte.alkfejl.kreta.model.User;
import hu.elte.alkfejl.kreta.model.Group;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@RestController
@RequestMapping("/api/groups")
public class GroupController {
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    public ResponseEntity findAll() {
        Iterable<Group> group = groupRepository.findAll();
        return ResponseEntity.ok(group);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity findById(@PathVariable Integer groupId) {
        Optional<Group> optionalGroup = groupRepository.findById(groupId);
        if (optionalGroup.isPresent()) {
            return ResponseEntity.ok(optionalGroup);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{groupId}/students")
    public ResponseEntity getStudents(@PathVariable Integer groupId) {
        Optional<Group> optionalGroup = groupRepository.findById(groupId);
        if (optionalGroup.isPresent()) {
            Group group = optionalGroup.get();

            Iterable<User> students = group.getStudents();

            return ResponseEntity.ok(students);
        }
        return ResponseEntity.notFound().build();
    }

}
