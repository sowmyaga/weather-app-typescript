 import { render, fireEvent, waitFor,cleanup } from '@testing-library/react';
 import Forcast from "./Forcaste";
 import axios from "axios";

afterEach(cleanup);
describe('Test Forcaste Componet', () => {
    beforeEach(async () => {
        const renderComponent=() => (render(<Forcast />));
        const { getByText } = renderComponent();
        jest.spyOn(axios, 'post').mockResolvedValue({
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
    });      
      
    it("should be able to type name input field", () => {
        const { getByTestId } = render (<Forcast />);
        fireEvent.change(getByTestId("unit"), { target: { value: "metrics" } });
        expect(getByTestId("unit").nodeValue).toBe("metrics");
      })
      
      it("Inputs should have the correct value", () => {
        const { getByLabelText } = render(<Forcast />)
        const input = getByLabelText(/Location/i)
        expect(input.nodeValue).toBe("");
        fireEvent.change(input, { target: { value: "Bangalore" } })
        expect(input.nodeValue).toBe("Bangalore");
      })
});
