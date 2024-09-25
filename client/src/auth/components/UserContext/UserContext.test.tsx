import { render, screen } from '@testing-library/react';
import { UserContext, useUserContext } from './UserContext';
import '@testing-library/jest-dom';

describe('UserContext', () => {
  const mockUser = {
    email: "test@example.com",
    id: 123,
    isAdmin: true,
    firstName: "Test",
    lastName: "User",
    isLoggedIn: true
  };

  // Mock component to simulate usage of the context
  const TestComponent = () => {
    const user = useUserContext();
    return <div>{user.firstName} {user.lastName}</div>;
  };

  it('provides user context', () => {
    render(
      <UserContext.Provider value={mockUser}>
        <TestComponent />
      </UserContext.Provider>
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
  });
});
