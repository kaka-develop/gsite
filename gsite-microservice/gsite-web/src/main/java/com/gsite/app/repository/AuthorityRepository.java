package com.gsite.app.repository;

import com.gsite.app.domain.Authority;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AuthorityRepository extends MongoRepository<Authority, String> {
}
