package com.example.jhdemo.repository.search;

import com.example.jhdemo.domain.Garantia;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Garantia entity.
 */
public interface GarantiaSearchRepository extends ElasticsearchRepository<Garantia, Long> {
}
