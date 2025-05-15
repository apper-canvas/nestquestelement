/**
 * Service for handling property data operations using the Apper SDK
 */

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

/**
 * Fetch properties with optional filtering
 * @param {Object} filters - Filter criteria (type, category, featured, new)
 * @param {Object} pagination - Pagination options (limit, offset)
 * @returns {Promise<Object>} - Properties data
 */
export async function fetchProperties(filters = {}, pagination = { limit: 20, offset: 0 }) {
  try {
    const apperClient = getApperClient();
    const tableName = 'property';
    
    // Build where conditions based on filters
    const whereConditions = [];
    
    if (filters.type) {
      whereConditions.push({
        fieldName: "type",
        operator: "ExactMatch",
        values: [filters.type]
      });
    }
    
    if (filters.category) {
      whereConditions.push({
        fieldName: "category",
        operator: "ExactMatch",
        values: [filters.category]
      });
    }
    
    if (filters.featured !== undefined) {
      whereConditions.push({
        fieldName: "featured",
        operator: "ExactMatch",
        values: [filters.featured]
      });
    }
    
    if (filters.new !== undefined) {
      whereConditions.push({
        fieldName: "new",
        operator: "ExactMatch",
        values: [filters.new]
      });
    }
    
    if (filters.searchQuery) {
      whereConditions.push({
        fieldName: "title",
        operator: "Contains",
        values: [filters.searchQuery]
      });
    }
    
    // Set up parameters
    const params = {
      Fields: [
        { Field: { Name: "Id" } },
        { Field: { Name: "title" } },
        { Field: { Name: "price" } },
        { Field: { Name: "type" } },
        { Field: { Name: "category" } },
        { Field: { Name: "address" } },
        { Field: { Name: "bedrooms" } },
        { Field: { Name: "bathrooms" } },
        { Field: { Name: "area" } },
        { Field: { Name: "image" } },
        { Field: { Name: "featured" } },
        { Field: { Name: "new" } }
      ],
      where: whereConditions,
      pagingInfo: {
        limit: pagination.limit,
        offset: pagination.offset
      },
      orderBy: [
        {
          field: "featured",
          direction: "DESC"
        },
        {
          field: "Id",
          direction: "DESC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords(tableName, params);
    
    return response?.data || [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
}

/**
 * Create a new property
 * @param {Object} propertyData - The property data to create
 * @returns {Promise<Object>} - Created property
 */
export async function createProperty(propertyData) {
  try {
    const apperClient = getApperClient();
    const tableName = 'property';
    
    // Format data for creation
    const newProperty = {
      title: propertyData.title,
      price: propertyData.price,
      type: propertyData.type,
      category: propertyData.category,
      address: propertyData.address,
      bedrooms: propertyData.bedrooms,
      bathrooms: propertyData.bathrooms,
      area: propertyData.area,
      image: propertyData.image || "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      featured: propertyData.featured || true,
      new: propertyData.new || true
    };
    
    const params = {
      records: [newProperty]
    };
    
    const response = await apperClient.createRecord(tableName, params);
    
    if (response && response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    }
    
    throw new Error('Failed to create property');
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  }
}

/**
 * Update an existing property
 * @param {Object} propertyData - Property data with ID
 * @returns {Promise<Object>} - Updated property
 */
export async function updateProperty(propertyData) {
  try {
    const apperClient = getApperClient();
    const tableName = 'property';
    
    if (!propertyData.Id) {
      throw new Error('Property ID is required for update');
    }
    
    const params = {
      records: [propertyData]
    };
    
    const response = await apperClient.updateRecord(tableName, params);
    
    if (response && response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    }
    
    throw new Error('Failed to update property');
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
}

/**
 * Delete a property by ID
 * @param {number} propertyId - ID of the property to delete
 * @returns {Promise<boolean>} - Success status
 */
export async function deleteProperty(propertyId) {
  try {
    const apperClient = getApperClient();
    const tableName = 'property';
    
    const params = {
      RecordIds: [propertyId]
    };
    
    const response = await apperClient.deleteRecord(tableName, params);
    
    return response && response.success;
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
}