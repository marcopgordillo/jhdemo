package com.example.jhdemo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.example.jhdemo.domain.enumeration.Country;

/**
 * A Contrato.
 */
@Entity
@Table(name = "contrato")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "contrato")
public class Contrato implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "codigo_contrato", nullable = false)
    private String codigoContrato;

    @NotNull
    @Column(name = "inicio_contrato", nullable = false)
    private LocalDate inicioContrato;

    @NotNull
    @Column(name = "plazo_meses", nullable = false)
    private Integer plazoMeses;

    @NotNull
    @Size(min = 5)
    @Column(name = "objeto_contrato", nullable = false)
    private String objetoContrato;

    @NotNull
    @Column(name = "monto", nullable = false)
    private Float monto;

    @Enumerated(EnumType.STRING)
    @Column(name = "nacionalidad")
    private Country nacionalidad;

    @NotNull
    @Column(name = "partida_presupuestaria", nullable = false)
    private String partidaPresupuestaria;

    @OneToOne
    @JoinColumn(unique = true)
    private Garantia garantia;

    @ManyToOne
    private TipoContrato tipo;

    @ManyToOne
    private Supervisor supervisor;

    @ManyToOne
    private Proveedor proveedor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoContrato() {
        return codigoContrato;
    }

    public Contrato codigoContrato(String codigoContrato) {
        this.codigoContrato = codigoContrato;
        return this;
    }

    public void setCodigoContrato(String codigoContrato) {
        this.codigoContrato = codigoContrato;
    }

    public LocalDate getInicioContrato() {
        return inicioContrato;
    }

    public Contrato inicioContrato(LocalDate inicioContrato) {
        this.inicioContrato = inicioContrato;
        return this;
    }

    public void setInicioContrato(LocalDate inicioContrato) {
        this.inicioContrato = inicioContrato;
    }

    public Integer getPlazoMeses() {
        return plazoMeses;
    }

    public Contrato plazoMeses(Integer plazoMeses) {
        this.plazoMeses = plazoMeses;
        return this;
    }

    public void setPlazoMeses(Integer plazoMeses) {
        this.plazoMeses = plazoMeses;
    }

    public String getObjetoContrato() {
        return objetoContrato;
    }

    public Contrato objetoContrato(String objetoContrato) {
        this.objetoContrato = objetoContrato;
        return this;
    }

    public void setObjetoContrato(String objetoContrato) {
        this.objetoContrato = objetoContrato;
    }

    public Float getMonto() {
        return monto;
    }

    public Contrato monto(Float monto) {
        this.monto = monto;
        return this;
    }

    public void setMonto(Float monto) {
        this.monto = monto;
    }

    public Country getNacionalidad() {
        return nacionalidad;
    }

    public Contrato nacionalidad(Country nacionalidad) {
        this.nacionalidad = nacionalidad;
        return this;
    }

    public void setNacionalidad(Country nacionalidad) {
        this.nacionalidad = nacionalidad;
    }

    public String getPartidaPresupuestaria() {
        return partidaPresupuestaria;
    }

    public Contrato partidaPresupuestaria(String partidaPresupuestaria) {
        this.partidaPresupuestaria = partidaPresupuestaria;
        return this;
    }

    public void setPartidaPresupuestaria(String partidaPresupuestaria) {
        this.partidaPresupuestaria = partidaPresupuestaria;
    }

    public Garantia getGarantia() {
        return garantia;
    }

    public Contrato garantia(Garantia garantia) {
        this.garantia = garantia;
        return this;
    }

    public void setGarantia(Garantia garantia) {
        this.garantia = garantia;
    }

    public TipoContrato getTipo() {
        return tipo;
    }

    public Contrato tipo(TipoContrato tipoContrato) {
        this.tipo = tipoContrato;
        return this;
    }

    public void setTipo(TipoContrato tipoContrato) {
        this.tipo = tipoContrato;
    }

    public Supervisor getSupervisor() {
        return supervisor;
    }

    public Contrato supervisor(Supervisor supervisor) {
        this.supervisor = supervisor;
        return this;
    }

    public void setSupervisor(Supervisor supervisor) {
        this.supervisor = supervisor;
    }

    public Proveedor getProveedor() {
        return proveedor;
    }

    public Contrato proveedor(Proveedor proveedor) {
        this.proveedor = proveedor;
        return this;
    }

    public void setProveedor(Proveedor proveedor) {
        this.proveedor = proveedor;
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
        Contrato contrato = (Contrato) o;
        if (contrato.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contrato.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Contrato{" +
            "id=" + getId() +
            ", codigoContrato='" + getCodigoContrato() + "'" +
            ", inicioContrato='" + getInicioContrato() + "'" +
            ", plazoMeses=" + getPlazoMeses() +
            ", objetoContrato='" + getObjetoContrato() + "'" +
            ", monto=" + getMonto() +
            ", nacionalidad='" + getNacionalidad() + "'" +
            ", partidaPresupuestaria='" + getPartidaPresupuestaria() + "'" +
            "}";
    }
}
