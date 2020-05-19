package hu.elte.alkfejl.enaplo.controller;

import hu.elte.alkfejl.enaplo.model.*;
import hu.elte.alkfejl.enaplo.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/marks")
public class MarkController {
    @Autowired private GroupRepository groupRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private MarkRepository markRepository;

    @PostMapping("")
    public ResponseEntity<MarkModel> post(@RequestBody MarkModel mark) {
        MarkModel saved = markRepository.save(mark);
        return ResponseEntity.ok(saved);
    }

    @PatchMapping("/{markId}")
    @PreAuthorize("hasAuthority('ROLE_TEACHER') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<MarkModel> patchMark(@PathVariable Integer markId, @RequestBody MarkModel mark) {
        Optional<MarkModel> optionalMark = markRepository.findById(markId);
        if (optionalMark.isPresent()) {
            MarkModel modifiableMark = optionalMark.get();
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
