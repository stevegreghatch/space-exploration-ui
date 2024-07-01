# Space Exploration UI

The Space Exploration UI offers a user interface designed for interaction with data pertaining to space exploration missions, programs, and astronauts. It integrates closely with the Space Exploration Persistence Service and the Space Exploration Data Service to fetch and display relevant data in an intuitive and user-friendly manner.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

### Docker Instructions

To run the Space Exploration UI using Docker, follow these steps:

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/stevegreghatch/space-exploration-ui.git
   cd space-exploration-ui
   ```

2. **Run the Persistence Service**:

   Follow the instructions in the [Space Exploration Persistence Service](https://github.com/stevegreghatch/space-exploration-persistence-service) to set up and run the persistence service.

2. **Run the Data Service**:

   Follow the instructions in the [Space Exploration Data Service repository](https://github.com/stevegreghatch/Space-Exploration) to set up and run the data service.

4. **Build the Docker Image**:

   ```sh
   docker build -t space-exploration-ui:latest .
   ```

5. **Run the Docker Container**:

   ```sh
   docker run -d -p 3000:3000 --name space-exploration-ui --network my-network space-exploration-ui:latest
   ```
   
## Project Links

- **Persistence Service**: [Space Exploration Persistence Service](https://github.com/stevegreghatch/space-exploration-persistence-service)
- **Data Service**: [Space Exploration Data Service](https://github.com/stevegreghatch/Space-Exploration)
- **Common Library**: [Space Exploration Common Library](https://github.com/stevegreghatch/space-exploration-common-lib)

