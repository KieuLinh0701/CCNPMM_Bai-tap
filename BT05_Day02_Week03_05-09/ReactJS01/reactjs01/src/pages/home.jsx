import { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Empty, Button, Space, Typography, Pagination } from 'antd';
import { getProductsApi, getCategoriesApi } from '../util/api';

const { Meta } = Card;
const { Title } = Typography;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const pageSize = 3; 

  // Fetch sản phẩm
  const fetchProducts = async (category, pageNumber) => {
  setLoading(true);
  try {
    const catParam = category === "All" ? undefined : category; 
    const res = await getProductsApi(catParam, pageNumber, pageSize);

    setProducts(res.data || []);
    setTotalProducts(res.totalItems || 0); 

    console.log("Products:", res.data);
    console.log("Total products:", res.totalItems);
  } catch (err) {
    console.error("Lỗi lấy sản phẩm:", err);
    setProducts([]);
    setTotalProducts(0);
  } finally {
    setLoading(false);
  }
};

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const data = await getCategoriesApi(); 
      if (Array.isArray(data)) {
        setCategories(["All", ...data]);
      } else {
        setCategories(["All"]);
      }
    } catch (err) {
      console.error("Lỗi lấy danh mục:", err);
      setCategories(["All"]);
    }
  };

  // Load categories khi mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Load sản phẩm khi category hoặc page thay đổi
  useEffect(() => {
    fetchProducts(selectedCategory, page);
  }, [selectedCategory, page]);

  // Reset page về 1 khi đổi category
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setPage(1);
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Danh Mục Sản Phẩm</Title>

      <Space style={{ marginBottom: 20, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <Button
            key={cat}
            type={selectedCategory === cat ? "primary" : "default"}
            onClick={() => handleCategoryChange(cat)}
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
        <>
          <Row gutter={[16, 16]}>
            {products.map(item => (
              <Col key={item._id} xs={24} sm={12} md={8} lg={8}>
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

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Pagination
              current={page}
              pageSize={pageSize}
              total={totalProducts}
              onChange={(p) => setPage(p)}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;