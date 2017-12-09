package com.example.jhdemo.repository.search;

import com.example.jhdemo.domain.Proveedor;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Proveedor entity.
 */
public interface ProveedorSearchRepository extends ElasticsearchRepository<Proveedor, Long> {
}
