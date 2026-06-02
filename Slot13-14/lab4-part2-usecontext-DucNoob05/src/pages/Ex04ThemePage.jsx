import { ThemeProvider, useTheme } from '../context/ThemeContext';
import ThemeNavbar from '../components/theme/ThemeNavbar';
import ThemedCard from '../components/theme/ThemedCard';
import ThemedButton from '../components/theme/ThemedButton';
import ThemedInput from '../components/theme/ThemedInput';

function ThemePageContent() {
  const { colors } = useTheme();

  return (
    <div 
      style={{ 
        backgroundColor: colors.background, 
        color: colors.text, 
        minHeight: '100vh', 
        transition: 'all 0.3s ease'
      }}
    >
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-8">
            <ThemeNavbar />
            
            <ThemedCard title="Form Demo">
              <p className="text-muted mb-3 fs-6">
                Đây là demo của ThemedInput kết hợp với ThemedButton. Mọi thành phần đều tự động cập nhật màu sắc khi bạn chuyển chế độ.
              </p>
              <div className="mb-3">
                <ThemedInput placeholder="Nhập từ khóa tìm kiếm..." />
              </div>
              <div className="d-flex gap-2">
                <ThemedButton variant="primary">Tìm kiếm</ThemedButton>
                <ThemedButton variant="outline">Hủy bỏ</ThemedButton>
              </div>
            </ThemedCard>

            <ThemedCard title="Studio Features">
              <p className="mb-0 fs-6">
                Hệ thống studio hỗ trợ việc phân tích, theo dõi và tùy chọn bộ nhận diện thương hiệu một cách nhanh chóng. Trải nghiệm chế độ tối bảo vệ thị lực trong môi trường thiếu sáng.
              </p>
            </ThemedCard>

            <ThemedCard title="Interactive Controls">
              <p className="text-muted mb-3 fs-6">
                Thử nghiệm tương tác với các nút bấm để trải nghiệm hiệu ứng màu sắc tương ứng.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <ThemedButton variant="primary">Đồng ý</ThemedButton>
                <ThemedButton variant="outline">Thử lại</ThemedButton>
              </div>
            </ThemedCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Ex04ThemePage() {
  return (
    <ThemeProvider>
      <ThemePageContent />
    </ThemeProvider>
  );
}
