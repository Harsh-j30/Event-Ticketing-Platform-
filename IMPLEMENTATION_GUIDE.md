# Event Platform - Implementation Guide

## Overview
This is a full-stack event ticketing platform with search functionality, city-based event browsing, and an admin panel for event creation.

## Features Implemented

### 1. **Search Bar Functionality**
- Search events by city name or event name
- Case-insensitive search
- Real-time search with navigation to event page
- Works from the Home page

### 2. **City-based Navigation**
- Click on city images in the "Popular Cities" section
- Click on city names in the "Other Cities" section
- Automatically navigates to the event page for that city

### 3. **Event Page**
- Displays all events for a selected city
- Shows event details:
  - Event image
  - Event name
  - Description
  - Location/Venue
  - Event date
  - Ticket price
- Book Now button for each event
- Empty state handling when no events are available
- Loading state while fetching events

### 4. **Admin Panel**
- Admin can add new events
- Form includes:
  - Event name
  - City (dropdown selection)
  - Description
  - Image URL
  - Ticket price
  - Event date and time
  - Location/Venue
- Success/error notifications

## Backend Architecture

### Database Models

#### Event Model (`Backend/models/Event.js`)
```javascript
{
  name: String (required),
  city: String (required),
  description: String (required),
  image: String (required, URL),
  price: Number (required),
  date: Date (required),
  location: String (required),
  createdBy: ObjectId (User reference),
  createdAt: Date (default: current date)
}
```

### API Endpoints

#### Event Routes (`/api/events`)

1. **GET `/`** - Get all events
2. **GET `/search?query=<query>`** - Search events by name/city/description
3. **GET `/city/:city`** - Get all events for a specific city
4. **GET `/:id`** - Get event by ID
5. **POST `/`** - Create new event
   - Body: `{ name, city, description, image, price, date, location }`
6. **PUT `/:id`** - Update event
7. **DELETE `/:id`** - Delete event

### Backend Files Created/Modified

1. **`Backend/models/Event.js`** - Event database model
2. **`Backend/controllers/eventController.js`** - Event business logic
3. **`Backend/routes/eventRoutes.js`** - Event API routes
4. **`Backend/server.js`** - Updated to include event routes

## Frontend Architecture

### Components

#### 1. **Home.jsx** (Updated)
- Search functionality implemented
- City click handlers for navigation
- Links to admin panel

#### 2. **EventPage.jsx** (New)
- Displays events for a specific city
- Shows event cards with details
- Handles loading and error states
- Empty state when no events found

#### 3. **AdminPanel.jsx** (New)
- Form for creating new events
- City selection dropdown
- Image URL input
- Date/time picker
- Form validation
- Success/error notifications

### API Services

#### `frontend/src/services/api.js` (Updated)
```javascript
// Auth endpoints
registerUser(data)
loginUser(data)

// Event endpoints
getAllEvents()
getEventsByCity(city)
searchEvents(query)
getEventById(id)
createEvent(data)
updateEvent(id, data)
deleteEvent(id)
```

### Routing

#### `App.js` - Updated Routes
- `/` - Landing page
- `/register` - Registration
- `/login` - Login
- `/home` - Home page (with search and city selection)
- `/events/:city` - Event page for a specific city
- `/admin/add-event` - Admin panel for adding events

## Installation & Setup

### Backend Setup

1. Navigate to Backend folder:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with database configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/event-platform
```

4. Start the server:
```bash
npm run dev
```
Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```
App will run on `http://localhost:3000`

## Database Schema

### Events Collection
- **name**: Event title
- **city**: City where event is happening
- **description**: Event details and description
- **image**: URL to event image
- **price**: Ticket price in INR
- **date**: Event date and time
- **location**: Venue/location details
- **createdBy**: Reference to admin/creator user
- **createdAt**: Timestamp of creation

## Usage Flow

### For Users:
1. Register/Login to the platform
2. Go to Home page
3. Either:
   - Use the search bar to find events by city/name
   - Click on popular cities
   - Click on city names in "Other Cities" list
4. Browse available events
5. Click "Book Now" to proceed with booking

### For Admin:
1. Login to the platform
2. Click "Add Event" in navbar
3. Fill in all event details
4. Click "Create Event"
5. Event will be added to database and visible to users

## Technical Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT

### Frontend
- **Framework**: React.js
- **Routing**: React Router
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Styling**: Inline CSS (can be migrated to styled-components)

## Features Details

### Search Functionality
- Searches in event name, city, and description fields
- Case-insensitive matching
- Returns all matching events
- Navigates to events page with results

### City Navigation
- Popular cities have images and click handlers
- Other cities are displayed as clickable tags
- Smooth animations on hover
- Redirects to event page for selected city

### Event Display
- Responsive grid layout
- Event cards with hover effects
- Displays all relevant information
- Handles missing images with placeholders

## Future Enhancements

1. **Booking System**
   - Shopping cart
   - Payment integration
   - Order confirmation

2. **User Reviews & Ratings**
   - Event ratings
   - User reviews
   - Rating display on event cards

3. **Advanced Filtering**
   - Price range filter
   - Date range filter
   - Category/genre filter

4. **User Dashboard**
   - My bookings
   - Booking history
   - Wishlist

5. **Admin Dashboard**
   - View all events
   - Edit/delete events
   - Analytics and reports

## Error Handling

- API errors are caught and displayed to users
- Form validation prevents invalid submissions
- Network errors are handled gracefully
- Empty states shown when no events found
- Loading states during data fetching

## Security Considerations

- Token-based authentication (JWT)
- Protected routes for admin operations
- Input validation on both client and server
- CORS enabled for frontend-backend communication

## Testing

### To test the functionality:

1. **Add an Event**:
   - Navigate to `/admin/add-event`
   - Fill in all fields
   - Submit the form
   - Should see success message

2. **View Events by City**:
   - Go to Home page
   - Click on any city
   - Should navigate to `/events/[city]`
   - Events for that city should load

3. **Search Events**:
   - Go to Home page
   - Type a city name in search box
   - Click Search button
   - Should navigate to events page with results

## API Testing with Postman/curl

### Create Event
```bash
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Conference 2026",
    "city": "Bengaluru",
    "description": "Annual tech conference",
    "image": "https://example.com/image.jpg",
    "price": 1000,
    "date": "2026-02-15T10:00:00",
    "location": "Convention Center"
  }'
```

### Get Events by City
```bash
curl http://localhost:5000/api/events/city/Bengaluru
```

### Search Events
```bash
curl "http://localhost:5000/api/events/search?query=tech"
```

## Database Setup Instructions

1. Install MongoDB (if not already installed)
2. Create database: `event-platform`
3. Create collections: `events`, `users`
4. Update MongoDB URI in `.env` file

## Troubleshooting

### Issue: Events not showing on Event page
- Check if backend is running on port 5000
- Verify MongoDB connection
- Check browser console for errors
- Ensure events exist in database for the selected city

### Issue: Search not working
- Verify API endpoint is correct
- Check if backend is running
- Check network tab in browser dev tools
- Verify event data in database

### Issue: Images not loading
- Provide valid image URLs
- Check CORS settings
- Verify image URL accessibility
- Use placeholder if image fails to load

---

**Created**: January 20, 2026
**Version**: 1.0
**Status**: Fully Functional
