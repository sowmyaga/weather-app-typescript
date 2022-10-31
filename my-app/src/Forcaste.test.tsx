import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Forcast from "./Forcaste";
import axios from "axios";

 jest.mock('axios'); // This overwrites axios methods with jest Mock
 const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Test Apis', () => {
    const renderComponent=() => (render(<Forcast />));
    test('getweatherData', async () => {
        const { getByText } = renderComponent();
        mockedAxios.get.mockResolvedValue({
            data:{
                country:"India",
                forcaste:[{
                    avg_temp_c: 22,
                    avg_temp_f: 71.6,
                    chance_of_rain:0,
                    condition:"Sunny",
                    date: "2022-10-31",
                    icon_url:"//cdn.weatherapi.com/weather/64x64/day/113.png",
                    max_temp_c: 27.4,
                    max_temp_f: 81.3,
                    max_wind_kph: 15.5,
                    max_wind_mph: 9.6,
                   min_temp_c: 18.1,
                   min_temp_f: 64.6,
                   sunrise: "06:13 AM",
                   sunset: "05:54 PM",
                   will_it_rain: false 
                }],
                latitude:12.98,
                local_time:"2022-10-31 10:37",
                location:"Bangalore",
                longitude:"77.58",
                region:"karnataka",
                timeZone:"Asia/Kolkata"

            }
          });
        fireEvent.click(getByText('Search'));
        await waitFor(() => {
            const weatherList = ('listitem');
            expect(weatherList).toHaveLength(7);
            expect(weatherList[0]).toHaveTextContent('Bangalore');
          });
    })
    
});

