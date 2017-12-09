package com.example.jhdemo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Enlace.
 */
@Entity
@Table(name = "enlace")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "enlace")
public class Enlace implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "enlace", nullable = false)
    private String enlace;

    @NotNull
    @Column(name = "jhi_year", nullable = false)
    private Integer year;

    @ManyToOne
    private Contrato contrato;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEnlace() {
        return enlace;
    }

    public Enlace enlace(String enlace) {
        this.enlace = enlace;
        return this;
    }

    public void setEnlace(String enlace) {
        this.enlace = enlace;
    }

    public Integer getYear() {
        return year;
    }

    public Enlace year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Contrato getContrato() {
        return contrato;
    }

    public Enlace contrato(Contrato contrato) {
        this.contrato = contrato;
        return this;
    }

    public void setContrato(Contrato contrato) {
        this.contrato = contrato;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Enlace enlace = (Enlace) o;
        if (enlace.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), enlace.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Enlace{" +
            "id=" + getId() +
            ", enlace='" + getEnlace() + "'" +
            ", year=" + getYear() +
            "}";
    }
}
