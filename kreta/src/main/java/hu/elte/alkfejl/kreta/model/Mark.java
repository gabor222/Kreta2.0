package hu.elte.alkfejl.kreta.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "enaplo_marks")
public class Mark {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @ManyToOne
    private Subject subject;

    private Integer studentUserId;

    private Integer teacherUserId;

    private Date date;

    private Integer mark;

    private String description;
}