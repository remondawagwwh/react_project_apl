import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
function Register() {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  

  const [errors, setErrors] = useState({});
  
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  
  const history = useHistory();

  
  const validateForm = () => {
    const newErrors = {};
    
    
    if (!username) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
  
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
  
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');
    
    try {
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      
      setSubmitSuccess('Registration successful! Redirecting to login...');
      
      
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    } catch (error) {
      setSubmitError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Sign up to start exploring movies</p>
        </div>
        
        <div className="auth-body">
          {submitError && (
            <div className="auth-error">
              <i className="fas fa-exclamation-circle"></i> {submitError}
            </div>
          )}
          
          {submitSuccess && (
            <div className="auth-success">
              <i className="fas fa-check-circle"></i> {submitSuccess}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-group">
                <span className="input-icon">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  id="username"
                  className={errors.username ? 'has-error' : ''}
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              {errors.username && <div className="error-message"style={{ color: 'red' }}>{errors.username}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-group">
                <span className="input-icon">
                  <i className="fas fa-envelope"></i>
                </span>
                <input
                  type="email"
                  id="email"
                  className={errors.email ? 'has-error' : ''}
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && <div className="error-message"style={{ color: 'red' }}>{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <span className="input-icon">
                  <i className="fas fa-lock"></i>
                </span>
                <input
                  type="password"
                  id="password"
                  className={errors.password ? 'has-error' : ''}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              {errors.password && <div className="error-message"style={{ color: 'red' }}>{errors.password}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-group">
                <span className="input-icon">
                  <i className="fas fa-lock"></i>
                </span>
                <input
                  type="password"
                  id="confirmPassword"
                  className={errors.confirmPassword ? 'has-error' : ''}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              {errors.confirmPassword && <div
                className="error-message"style={{ color: 'red' }}>{errors.confirmPassword}</div>}
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
