package hu.elte.alkfejl.kreta.controller;

import hu.elte.alkfejl.kreta.repository.UserRepository;
import hu.elte.alkfejl.kreta.repository.MarkRepository;
import hu.elte.alkfejl.kreta.repository.GroupRepository;
import hu.elte.alkfejl.kreta.model.Mark;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/marks")
public class MarkController {
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MarkRepository markRepository;

    @PatchMapping("/{markId}")
    @Secured({ "ROLE_TEACHER", "ROLE_ADMIN" })
    public ResponseEntity<Mark> pathMark(@PathVariable Integer markId, @RequestBody Mark mark) {
        Optional<Mark> optionalMark = markRepository.findById(markId);
        if (optionalMark.isPresent()) {
            Mark modifiableMark = optionalMark.get();
            if (mark.getStudentUserId() != null) {
                modifiableMark.setStudentUserId(mark.getStudentUserId());
            }
            if (mark.getDescription() != null) {
                modifiableMark.setDescription((mark.getDescription()));
            }
            if (mark.getMark() != null) {
                modifiableMark.setMark((mark.getMark()));
            }
            if (mark.getSubject() != null) {
                modifiableMark.setSubject((mark.getSubject()));
            }
            return ResponseEntity.ok(markRepository.save(modifiableMark));
        }
        return ResponseEntity.notFound().build();
    }

}
