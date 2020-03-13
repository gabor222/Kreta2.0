package hu.elte.alkfejl.kreta.repository;

import hu.elte.alkfejl.kreta.model.Subject;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer> {

}