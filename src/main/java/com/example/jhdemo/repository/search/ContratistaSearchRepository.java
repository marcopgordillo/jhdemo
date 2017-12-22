package com.example.jhdemo.repository.search;

import com.example.jhdemo.domain.Contratista;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Contratista entity.
 */
public interface ContratistaSearchRepository extends ElasticsearchRepository<Contratista, Long> {
}
