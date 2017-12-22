package com.example.jhdemo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Garantia.
 */
@Entity
@Table(name = "garantia")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "garantia")
public class Garantia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "titulo", nullable = false)
    private String titulo;

    @NotNull
    @Lob
    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @NotNull
    @Column(name = "vigencia_meses", nullable = false)
    private Integer vigenciaMeses;

    @NotNull
    @Column(name = "porcentaje_cobertura", nullable = false)
    private Float porcentajeCobertura;

    @Lob
    @Column(name = "penalidad")
    private String penalidad;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public Garantia titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Garantia descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getVigenciaMeses() {
        return vigenciaMeses;
    }

    public Garantia vigenciaMeses(Integer vigenciaMeses) {
        this.vigenciaMeses = vigenciaMeses;
        return this;
    }

    public void setVigenciaMeses(Integer vigenciaMeses) {
        this.vigenciaMeses = vigenciaMeses;
    }

    public Float getPorcentajeCobertura() {
        return porcentajeCobertura;
    }

    public Garantia porcentajeCobertura(Float porcentajeCobertura) {
        this.porcentajeCobertura = porcentajeCobertura;
        return this;
    }

    public void setPorcentajeCobertura(Float porcentajeCobertura) {
        this.porcentajeCobertura = porcentajeCobertura;
    }

    public String getPenalidad() {
        return penalidad;
    }

    public Garantia penalidad(String penalidad) {
        this.penalidad = penalidad;
        return this;
    }

    public void setPenalidad(String penalidad) {
        this.penalidad = penalidad;
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
        Garantia garantia = (Garantia) o;
        if (garantia.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), garantia.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Garantia{" +
            "id=" + getId() +
            ", titulo='" + getTitulo() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", vigenciaMeses=" + getVigenciaMeses() +
            ", porcentajeCobertura=" + getPorcentajeCobertura() +
            ", penalidad='" + getPenalidad() + "'" +
            "}";
    }
}
