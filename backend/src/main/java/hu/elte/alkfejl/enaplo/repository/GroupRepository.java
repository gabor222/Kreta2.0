package hu.elte.alkfejl.enaplo.repository;

import hu.elte.alkfejl.enaplo.model.ClassModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<ClassModel, Integer> {

}