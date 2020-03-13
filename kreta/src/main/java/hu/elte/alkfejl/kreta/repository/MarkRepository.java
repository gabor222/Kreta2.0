package hu.elte.alkfejl.kreta.repository;

import hu.elte.alkfejl.kreta.model.Mark;
import hu.elte.alkfejl.kreta.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MarkRepository extends JpaRepository<Mark, Integer> {

}