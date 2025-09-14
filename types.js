
export type SeatStatus = 'available' | 'selected' | 'booked' | 'ladies';

export interface Seat {
  id: string;
  number: string;
  status: SeatStatus;
  price: number;
}

export interface Bus {
  id:string;
  name: string;
  operator: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  from: string;
  to: string;
  price: number;
  rating: number;
  seats: (Seat | null)[][];
}

export interface Trip {
    id: string;
    busName: string;
    from: string;
    to: string;
    date: string;
    departureTime: string;
    arrivalTime: string;
    seatNumbers: string[];
    fare: number;
    status: 'Upcoming' | 'Completed' | 'Cancelled';
}
