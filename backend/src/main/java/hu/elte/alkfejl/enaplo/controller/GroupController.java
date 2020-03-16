package hu.elte.alkfejl.enaplo.controller;

import hu.elte.alkfejl.enaplo.model.*;
import hu.elte.alkfejl.enaplo.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        Iterable<ClassModel> group = groupRepository.findAll();
        return ResponseEntity.ok(group);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity findById(@PathVariable Integer groupId) {
        Optional<ClassModel> optionalGroup = groupRepository.findById(groupId);
        if (optionalGroup.isPresent()) {
            return ResponseEntity.ok(optionalGroup);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{groupId}/students")
    public ResponseEntity getStudents(@PathVariable Integer groupId) {
        Optional<ClassModel> optionalGroup = groupRepository.findById(groupId);
        if (optionalGroup.isPresent()) {
            ClassModel group = optionalGroup.get();
            Iterable<UserModel> students = group.getStudents();
            return ResponseEntity.ok(students);
        }
        return ResponseEntity.notFound().build();
    }

}
