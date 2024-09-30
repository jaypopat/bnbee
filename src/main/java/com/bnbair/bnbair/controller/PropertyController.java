package com.bnbair.bnbair.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.bnbair.bnbair.domain.Property;
import com.bnbair.bnbair.exception.PropertyNotFoundException;
import com.bnbair.bnbair.service.PropertyService;

@RestController
@RequestMapping("/properties")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public ResponseEntity<List<Property>> getAllProperties() {
        List<Property> properties = propertyService.getAllProperties();
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) throws PropertyNotFoundException {
        Property property = propertyService.getPropertyById(id);
        return ResponseEntity.ok(property);
    }

    @PostMapping
    public ResponseEntity<Property> createProperty(@RequestBody Property property) {
        Property createdProperty = propertyService.createProperty(property);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProperty);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property propertyDetails)
            throws PropertyNotFoundException {
        Property updatedProperty = propertyService.updateProperty(id, propertyDetails);
        return ResponseEntity.ok(updatedProperty);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) throws PropertyNotFoundException {
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }
}
