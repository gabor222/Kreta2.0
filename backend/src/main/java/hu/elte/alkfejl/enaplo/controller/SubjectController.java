package hu.elte.alkfejl.enaplo.controller;

import hu.elte.alkfejl.enaplo.model.*;
import hu.elte.alkfejl.enaplo.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {
    @Autowired private SubjectRepository subjectRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private MarkRepository markRepository;

    @GetMapping("")
    public ResponseEntity<Iterable<SubjectModel>> findAllSubjects() {
        Iterable<SubjectModel> subjects = subjectRepository.findAll();
        return ResponseEntity.ok(subjects);
    }

    @GetMapping("/{subjectId}")
    public ResponseEntity<Optional<SubjectModel>> findSubjectById(@PathVariable Integer subjectId) {
        Optional<SubjectModel> subject = subjectRepository.findById(subjectId);
        if (subject.isPresent()) {
            return ResponseEntity.ok(subject);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<SubjectModel> addSubject(@RequestBody SubjectModel subject) {
        SubjectModel saved = subjectRepository.save(subject);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{subjectId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<SubjectModel> updateSubject(@PathVariable Integer subjectId, @RequestBody SubjectModel subject) {
        Optional<SubjectModel> optionalSubject = subjectRepository.findById(subjectId);
        if (optionalSubject.isPresent()) {
            SubjectModel current = optionalSubject.get();
            current.setName(subject.getName());
            SubjectModel saved = subjectRepository.save(current);
            return ResponseEntity.ok(saved);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{subjectId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity deleteSubject(@PathVariable Integer subjectId) {
        Optional<SubjectModel> optional = subjectRepository.findById(subjectId);
        if (optional.isPresent()) {
            subjectRepository.deleteById(subjectId);
            Iterable<SubjectModel> subjects = subjectRepository.findAll();
            return ResponseEntity.ok(subjects);
        }
        return ResponseEntity.notFound().build();
    }

    // Osztályzatok
    @GetMapping("/{subjectId}/marks/{markId}")
    @PreAuthorize("hasAuthority('ROLE_STUDENT') or hasAuthority('ROLE_TEACHER')")
    public ResponseEntity<MarkModel> getMark(@PathVariable Integer subjectId, @PathVariable Integer markId) {
        Optional<SubjectModel> optionalSubject = subjectRepository.findById(subjectId);
        Optional<MarkModel> optionalMark = markRepository.findById(markId);
        if (optionalSubject.isPresent() && optionalMark.isPresent()) {
            return ResponseEntity.ok(optionalMark.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{subjectId}/marks/{userId}")
    @PreAuthorize("hasAuthority('ROLE_STUDENT') or hasAuthority('ROLE_TEACHER')")
    public ResponseEntity getStudentMarks(@PathVariable Integer subjectId, @PathVariable Integer userId) {
        Optional<SubjectModel> optionalSubject = subjectRepository.findById(subjectId);
        Optional<UserModel> optionalUser = userRepository.findById(userId);
        if (optionalSubject.isPresent() && optionalUser.isPresent()) {
            SubjectModel subject = optionalSubject.get();

            Iterable<MarkModel> marks = subject.getMarks().stream()
                    .filter(mark -> mark.getStudentUserId() == userId)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(marks);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{subjectId}/marks")
    @PreAuthorize("hasAuthority('ROLE_TEACHER')")
    public ResponseEntity<MarkModel> addMark(@PathVariable Integer subjectId, @RequestBody MarkModel mark) {
        Optional<SubjectModel> optionalSubject = subjectRepository.findById(subjectId);
        if (optionalSubject.isPresent()) {
            mark.setSubject(optionalSubject.get());
            MarkModel saved = markRepository.save(mark);
            return ResponseEntity.ok(saved);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{subjectId}/marks/{markId}")
    @PreAuthorize("hasAuthority('ROLE_TEACHER')")
    public ResponseEntity<MarkModel> deleteMark(@PathVariable Integer subjectId, @PathVariable Integer markId) {
        Optional<SubjectModel> optionalSubject = subjectRepository.findById(subjectId);
        Optional<MarkModel> optionalMark = markRepository.findById(markId);
        if (optionalSubject.isPresent() && optionalMark.isPresent()) {
            markRepository.deleteById(markId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
