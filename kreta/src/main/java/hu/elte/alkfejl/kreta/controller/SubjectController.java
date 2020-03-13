package hu.elte.alkfejl.kreta.controller;

import hu.elte.alkfejl.kreta.repository.UserRepository;
import hu.elte.alkfejl.kreta.repository.SubjectRepository;
import hu.elte.alkfejl.kreta.repository.MarkRepository;
import hu.elte.alkfejl.kreta.model.Mark;
import hu.elte.alkfejl.kreta.model.User;
import hu.elte.alkfejl.kreta.model.Subject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {
    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MarkRepository markRepository;

    @GetMapping("")
    public ResponseEntity<Iterable<Subject>> findAllSubjects() {
        Iterable<Subject> subjects = subjectRepository.findAll();
        return ResponseEntity.ok(subjects);
    }

    @GetMapping("/{subjectId}")
    public ResponseEntity<Optional<Subject>> findSubjectById(@PathVariable Integer subjectId) {
        Optional<Subject> subject = subjectRepository.findById(subjectId);
        if (subject.isPresent()) {
            return ResponseEntity.ok(subject);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Subject> addSubject(@RequestBody Subject subject) {
        Subject saved = subjectRepository.save(subject);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{subjectId}")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Subject> updateSubject(@PathVariable Integer subjectId, @RequestBody Subject subject) {
        Optional<Subject> optionalSubject = subjectRepository.findById(subjectId);
        if (optionalSubject.isPresent()) {
            Subject current = optionalSubject.get();
            current.setName(subject.getName());
            Subject saved = subjectRepository.save(current);
            return ResponseEntity.ok(saved);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{subjectId}")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity deleteSubject(@PathVariable Integer subjectId) {
        Optional<Subject> optional = subjectRepository.findById(subjectId);
        if (optional.isPresent()) {
            subjectRepository.deleteById(subjectId);
            Iterable<Subject> subjects = subjectRepository.findAll();
            return ResponseEntity.ok(subjects);
        }
        return ResponseEntity.notFound().build();
    }

    // Osztályzatok

    @GetMapping("/{subjectId}/marks/{markId}")
    @Secured({ "ROLE_STUDENT", "ROLE_TEACHER" })
    public ResponseEntity<Mark> getMark(@PathVariable Integer subjectId, @PathVariable Integer markId) {
        Optional<Subject> optionalSubject = subjectRepository.findById(subjectId);
        Optional<Mark> optionalMark = markRepository.findById(markId);
        if (optionalSubject.isPresent() && optionalMark.isPresent()) {
            return ResponseEntity.ok(optionalMark.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{subjectId}/marks/{userId}")
    @Secured({ "ROLE_STUDENT", "ROLE_TEACHER" })
    public ResponseEntity getStudentMarks(@PathVariable Integer subjectId, @PathVariable Integer userId) {
        Optional<Subject> optionalSubject = subjectRepository.findById(subjectId);
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalSubject.isPresent() && optionalUser.isPresent()) {
            Subject subject = optionalSubject.get();

            Iterable<Mark> marks = subject.getMarks().stream()
                    .filter(mark -> mark.getStudentUserId() == userId)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(marks);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{subjectId}/marks")
    @Secured({ "ROLE_TEACHER" })
    public ResponseEntity<Mark> addMark(@PathVariable Integer subjectId, @RequestBody Mark mark) {
        Optional<Subject> optionalSubject = subjectRepository.findById(subjectId);
        if (optionalSubject.isPresent()) {
            mark.setSubject(optionalSubject.get());
            Mark saved = markRepository.save(mark);
            return ResponseEntity.ok(saved);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{subjectId}/marks/{markId}")
    @Secured({ "ROLE_TEACHER" })
    public ResponseEntity<Mark> deleteMark(@PathVariable Integer subjectId, @PathVariable Integer markId) {
        Optional<Subject> optionalSubject = subjectRepository.findById(subjectId);
        Optional<Mark> optionalMark = markRepository.findById(markId);
        if (optionalSubject.isPresent() && optionalMark.isPresent()) {
            markRepository.deleteById(markId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
