import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('UI error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container empty">
          <h1>เกิดข้อผิดพลาดบางอย่าง</h1>
          <p>ไม่สามารถแสดงหน้านี้ได้ ลองรีเฟรชหน้าเว็บอีกครั้ง</p>
          <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
            รีเฟรชหน้า
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
