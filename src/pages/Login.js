import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
function Login({ setIsLoggedIn }) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  
  const [errors, setErrors] = useState({});
  
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const history = useHistory();

  
  const validateForm = () => {
    const newErrors = {};
    
    
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoggedIn(true);
      history.push('/'); 
    } catch (error) {
      setSubmitError('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue to Movies App</p>
        </div>
        
        <div className="auth-body">
          {submitError && (
            <div className="auth-error">
              <i className="fas fa-exclamation-circle"></i> {submitError}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
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
              {errors.email && <div className="error-message" style={{ color: 'red' }}>{errors.email}</div>}
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
            
            <button 
              type="submit" 
              className="auth-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Logging in...
                </>
              ) : 'Sign In'}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>Don't have an account? <a href="/register">Sign up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
