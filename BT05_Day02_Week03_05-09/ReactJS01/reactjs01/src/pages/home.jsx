import { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Empty, Button, Space, Typography } from 'antd';
import { getProductsApi, getCategoriesApi } from '../util/api';

const { Meta } = Card;
const { Title } = Typography;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Lấy danh mục từ backend
  const fetchCategories = async () => {
    try {
      const res = await getCategoriesApi();
      const data = res?.data || res || [];
      setCategories(["All", ...data]);
    } catch (err) {
      console.error("Lỗi lấy danh mục:", err);
    }
  };

  // Lấy sản phẩm theo category
  const fetchProducts = async (category = null) => {
    setLoading(true);
    try {
      const catParam = category === "All" ? null : category;
      const res = await getProductsApi(catParam, 1, 12);
      setProducts(res?.data || []);
    } catch (err) {
      console.error("Lỗi lấy sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Danh Mục Sản Phẩm</Title>
      <Space style={{ marginBottom: 20, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <Button
            key={cat}
            type={selectedCategory === cat ? "primary" : "default"}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </Space>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 50 }}>
          <Spin size="large" tip="Đang tải sản phẩm..." />
        </div>
      ) : products.length === 0 ? (
        <Empty description="Không có sản phẩm" />
      ) : (
        <Row gutter={[16, 16]}>
          {products.map(item => (
            <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                cover={
                  <img
                    alt={item.name}
                    src={item.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                    style={{ objectFit: 'cover', height: 200 }}
                  />
                }
              >
                <Meta title={item.name} description={`Giá: $${item.price}`} />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomePage;