package hu.elte.alkfejl.enaplo.repository;

import hu.elte.alkfejl.enaplo.model.MarkModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarkRepository extends JpaRepository<MarkModel, Integer> {

}