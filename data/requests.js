// requests.js - Service request data store

// Sample service requests with different statuses
const requests = [
  {
    id: 'req_001',
    customerId: 'user_001',
    providerId: 'provider_001',
    customerName: 'Amit Sharma',
    providerName: 'Rajesh Kumar',
    service: 'Plumbing',
    description: 'Kitchen sink is leaking, need urgent repair',
    location: 'Koramangala, Bangalore',
    preferredDate: '2025-12-20',
    preferredTime: '10:00 AM',
    status: 'confirmed', // pending_admin, requested, confirmed, completed, cancelled
    createdAt: '2025-12-15T10:00:00Z',
    updatedAt: '2025-12-15T14:30:00Z',
    timeline: [
      { status: 'pending_admin', timestamp: '2025-12-15T10:00:00Z', note: 'Request submitted' },
      { status: 'requested', timestamp: '2025-12-15T11:00:00Z', note: 'Approved by admin' },
      { status: 'confirmed', timestamp: '2025-12-15T14:30:00Z', note: 'Accepted by provider' }
    ]
  },
  {
    id: 'req_002',
    customerId: 'user_001',
    providerId: 'provider_002',
    customerName: 'Amit Sharma',
    providerName: 'Sunita Devi',
    service: 'House Cleaning',
    description: 'Full house cleaning needed for 2BHK apartment',
    location: 'Koramangala, Bangalore',
    preferredDate: '2025-12-22',
    preferredTime: '9:00 AM',
    status: 'pending_admin',
    createdAt: '2025-12-19T09:00:00Z',
    updatedAt: '2025-12-19T09:00:00Z',
    timeline: [
      { status: 'pending_admin', timestamp: '2025-12-19T09:00:00Z', note: 'Request submitted' }
    ]
  },
  {
    id: 'req_003',
    customerId: 'user_001',
    providerId: 'provider_001',
    customerName: 'Amit Sharma',
    providerName: 'Rajesh Kumar',
    service: 'Electrical',
    description: 'Install ceiling fan in bedroom',
    location: 'Koramangala, Bangalore',
    preferredDate: '2025-12-18',
    preferredTime: '3:00 PM',
    status: 'completed',
    createdAt: '2025-12-12T08:00:00Z',
    updatedAt: '2025-12-18T17:00:00Z',
    timeline: [
      { status: 'pending_admin', timestamp: '2025-12-12T08:00:00Z', note: 'Request submitted' },
      { status: 'requested', timestamp: '2025-12-12T09:00:00Z', note: 'Approved by admin' },
      { status: 'confirmed', timestamp: '2025-12-12T10:30:00Z', note: 'Accepted by provider' },
      { status: 'completed', timestamp: '2025-12-18T17:00:00Z', note: 'Work completed' }
    ]
  }
];

// Load requests from localStorage or use sample data
function loadRequests() {
  const stored = localStorage.getItem('karigar_requests');
  if (stored) {
    return JSON.parse(stored);
  }
  return [...requests];
}

// Save requests to localStorage
function saveRequests(requestList) {
  localStorage.setItem('karigar_requests', JSON.stringify(requestList));
}

// Get request by ID
function getRequestById(requestId) {
  const requestList = loadRequests();
  return requestList.find(r => r.id === requestId);
}

// Add new request
function addRequest(requestData) {
  const requestList = loadRequests();
  const newRequest = {
    id: `req_${Date.now()}`,
    ...requestData,
    status: 'pending_admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    timeline: [
      {
        status: 'pending_admin',
        timestamp: new Date().toISOString(),
        note: 'Request submitted'
      }
    ]
  };
  requestList.push(newRequest);
  saveRequests(requestList);
  return newRequest;
}

// Update request status
function updateRequestStatus(requestId, newStatus, note = '') {
  const requestList = loadRequests();
  const index = requestList.findIndex(r => r.id === requestId);
  if (index !== -1) {
    requestList[index].status = newStatus;
    requestList[index].updatedAt = new Date().toISOString();
    requestList[index].timeline.push({
      status: newStatus,
      timestamp: new Date().toISOString(),
      note: note || `Status changed to ${newStatus}`
    });
    saveRequests(requestList);
    return requestList[index];
  }
  return null;
}

// Get requests by customer
function getRequestsByCustomer(customerId) {
  const requestList = loadRequests();
  return requestList.filter(r => r.customerId === customerId);
}

// Get requests by provider
function getRequestsByProvider(providerId) {
  const requestList = loadRequests();
  return requestList.filter(r => r.providerId === providerId);
}

// Get requests by status
function getRequestsByStatus(status) {
  const requestList = loadRequests();
  return requestList.filter(r => r.status === status);
}

// Get all pending admin requests
function getPendingAdminRequests() {
  return getRequestsByStatus('pending_admin');
}
