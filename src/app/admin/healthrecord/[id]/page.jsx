"use client";
import { useEffect, useState } from "react";
import { Card, List, Descriptions, Tag } from "antd";
import axios from "axios";
import { useParams } from "next/navigation";
import moment from "moment";
import { MedicineBoxOutlined } from "@ant-design/icons";
const COLORS = {
  primary: "#1677ff", // Màu chủ đạo
  secondary: "#4096ff", // Màu phụ
  success: "#52c41a", // Màu thành công
  error: "#ff4d4f", // Màu lỗi/cảnh báo
  warning: "#faad14", // Màu cảnh báo
  text: {
    primary: "#262626", // Màu chữ chính
    secondary: "#595959", // Màu chữ phụ
    light: "#8c8c8c", // Màu chữ nhạt
  },
  background: {
    light: "#fafafa", // Màu nền nhạt
    main: "#f0f2f5", // Màu nền chính
    card: "#ffffff", // Màu nền card
  },
  border: "#f0f0f0", // Màu viền
};

export default function HealthRecordDetail() {
  const { id } = useParams();
  const [record, setRecord] = useState({
    id: id,
    injectionDate: "2024-03-20",
    vaccineName: "Vaccine A",
    areaName: "Khu A",
    note: "Tiêm phòng định kỳ",
  });

  const [pigsList, setPigsList] = useState([
    {
      id: "P001",
      weight: 80,
      healthStatus: "Khỏe mạnh",
      symptoms: "Không có",
      diagnosis: "Khám định kỳ",
      treatment: "Tiêm vaccine phòng bệnh",
      isVaccinated: true,
      medication: null,
    },
    {
      id: "P002",
      weight: 75,
      healthStatus: "Yếu",
      symptoms: "Sốt nhẹ, biếng ăn",
      diagnosis: "Nhiễm khuẩn đường ruột",
      treatment: "Điều trị bằng thuốc",
      isVaccinated: false,
      medication: {
        name: "Kháng sinh A",
        dosage: "2 viên/ngày",
        duration: "5 ngày",
      },
    },
    {
      id: "P003",
      weight: 70,
      healthStatus: "Yếu",
      symptoms: "Ho, sốt cao",
      diagnosis: "Viêm phổi nặng",
      treatment: "Theo dõi và chăm sóc",
      isVaccinated: false,
      medication: null,
    },
  ]);

  useEffect(() => {
    getHealthRecordDetail();
  }, [id]);

  const getHealthRecordDetail = async () => {
    try {
      const recordResponse = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/HealthRecords/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const pigsResponse = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/HealthRecords/${id}/pigs`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setRecord(recordResponse.data.data);
      setPigsList(pigsResponse.data.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const getHealthStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "khỏe mạnh":
        return "green";
      case "yếu":
        return "red";
      default:
        return "orange";
    }
  };

  const renderTreatmentInfo = (pig) => {
    if (pig.isVaccinated) {
      return (
        <div
          style={{
            padding: "16px",
            background: COLORS.background.light,
            borderRadius: "8px",
            color: COLORS.text.secondary,
            lineHeight: "1.5",
          }}
        >
          {pig.treatment}
        </div>
      );
    }

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            padding: "16px",
            background: COLORS.background.light,
            borderRadius: "8px",
            color: COLORS.text.secondary,
            lineHeight: "1.5",
          }}
        >
          {pig.treatment}
        </div>

        {/* Phần thông tin thuốc */}
        <div
          style={{
            border: `1px solid ${
              pig.medication ? COLORS.secondary : COLORS.error
            }`,
            borderRadius: "8px",
            padding: "16px",
            marginTop: "8px",
          }}
        >
          <div
            style={{
              fontWeight: 600,
              color: pig.medication ? COLORS.secondary : COLORS.error,
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <MedicineBoxOutlined />
            Thông tin thuốc điều trị
          </div>

          {pig.medication ? (
            <div
              style={{
                display: "grid",
                gap: "12px",
                color: COLORS.text.secondary,
              }}
            >
              <div>
                <span style={{ fontWeight: 500 }}>Tên thuốc:</span>{" "}
                {pig.medication.name}
              </div>
              <div>
                <span style={{ fontWeight: 500 }}>Liều lượng:</span>{" "}
                {pig.medication.dosage}
              </div>
              <div>
                <span style={{ fontWeight: 500 }}>Thời gian điều trị:</span>{" "}
                {pig.medication.duration}
              </div>
            </div>
          ) : (
            <div style={{ color: COLORS.error }}>
              Tình trạng không phù hợp để điều trị bằng thuốc
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        height: "100vh",
        overflow: "auto",
        padding: "24px",
        backgroundColor: "#f0f2f5",
        fontSize: "16px",
        width: "100%",
        flex: 1,
      }}
    >
      <Card
        title={
          <span style={{ fontSize: "24px" }}>
            Thông tin phiếu khám/chích ngừa
          </span>
        }
        style={{
          marginBottom: 32,
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
          width: "100%",
        }}
      >
        <Descriptions
          bordered
          column={2}
          labelStyle={{
            fontWeight: 600,
            fontSize: "16px",
            padding: "16px 24px",
            width: "200px",
          }}
          contentStyle={{
            fontSize: "16px",
            padding: "16px 24px",
          }}
        >
          <Descriptions.Item label="Mã phiếu">{record.id}</Descriptions.Item>
          <Descriptions.Item label="Ngày khám">
            {moment(record.injectionDate).format("DD/MM/YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Tên vắc xin">
            {record.vaccineName}
          </Descriptions.Item>
          <Descriptions.Item label="Khu vực">
            {record.areaName}
          </Descriptions.Item>
          <Descriptions.Item label="Ghi chú" span={2}>
            {record.note}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card
        title={
          <span style={{ fontSize: "24px" }}>Danh sách heo được khám</span>
        }
        style={{
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
          width: "100%",
        }}
      >
        <List
          style={{ width: "100%" }}
          dataSource={pigsList}
          renderItem={(pig) => (
            <List.Item style={{ width: "100%" }}>
              <Card
                type="inner"
                title={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "20px" }}>{`Heo #${pig.id}`}</span>
                    <Tag
                      color={getHealthStatusColor(pig.healthStatus)}
                      style={{ fontSize: "14px" }}
                    >
                      {pig.healthStatus}
                    </Tag>
                  </div>
                }
                style={{
                  width: "100%",
                  marginBottom: "24px",
                }}
              >
                <Descriptions
                  bordered
                  column={2}
                  labelStyle={{
                    fontWeight: 600,
                    fontSize: "16px",
                    padding: "16px 24px",
                    width: "200px",
                  }}
                  contentStyle={{
                    fontSize: "16px",
                    padding: "16px 24px",
                  }}
                >
                  <Descriptions.Item label="Cân nặng">
                    {pig.weight} kg
                  </Descriptions.Item>
                  <Descriptions.Item label="Tình trạng tiêm">
                    {pig.isVaccinated ? (
                      <Tag color="green">Đã tiêm vaccine</Tag>
                    ) : (
                      <Tag color="red">Không đủ điều kiện tiêm</Tag>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Triệu chứng" span={2}>
                    {pig.symptoms || "Không có"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Chẩn đoán" span={2}>
                    {pig.diagnosis}
                  </Descriptions.Item>
                  <div style={{ marginBottom: "20px" }}>
                    <div
                      style={{
                        fontWeight: 600,
                        marginBottom: "8px",
                        color: COLORS.text.primary,
                        fontSize: "15px",
                      }}
                    >
                      Phương pháp điều trị
                    </div>
                    {renderTreatmentInfo(pig)}
                  </div>
                </Descriptions>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
