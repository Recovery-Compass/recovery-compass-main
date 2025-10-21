# WFD Compliance Dashboard

A dynamic, file-upload-driven compliance dashboard for Whittier First Day (WFD) programs. Replace hardcoded static dashboards with real-time data processing for Jacob Lozoya and the WFD team.

## 🎯 Purpose

Track MOU compliance, program performance, and data quality for WFD's housing programs:
- Ted's Place
- Hondo
- Pathway Home
- Midvale
- A2C
- ICMS

## ✨ Key Features

### 1. Dynamic File Upload
- Drag-and-drop Excel/CSV files
- Automatic validation of required columns
- Instant data processing and analysis
- No more hardcoded data!

### 2. Real-Time Metrics
- Total clients served
- Active enrollments
- Housing placements
- Average length of stay
- Placement rate calculations

### 3. MOU Compliance Tracking
- Field coverage analysis (80% threshold)
- Red/yellow/green status indicators
- Critical issue flagging
- IntakeDate and ExitDestination validation

### 4. Program Performance Comparison
- Side-by-side program metrics
- Top performer identification
- Sortable columns
- Export capabilities

### 5. Advanced Data Management
- Filter by program
- Search by Client ID
- Sort by any column
- Export filtered data to Excel
- Pagination for large datasets

## 📋 Required File Format

Your Excel/CSV file must include these columns:

| Column | Type | Description | Required |
|--------|------|-------------|----------|
| ClientID | string | Unique client identifier | Yes |
| ProgramName | string | Program name (Ted's Place, Hondo, etc.) | Yes |
| IntakeDate | date | ISO format: YYYY-MM-DD | Yes (80% for MOU) |
| ExitDate | date | ISO format or blank for active clients | Yes |
| ExitDestination | string | "Permanent Housing", "Self-Exit", etc. | Yes (80% for MOU) |
| HousingPlacementDate | date | ISO format or blank | Yes |
| LengthOfStay | number | Days or blank for auto-calculation | Yes |

### Example Data

```csv
ClientID,ProgramName,IntakeDate,ExitDate,ExitDestination,HousingPlacementDate,LengthOfStay
WFD001,Ted's Place,2024-01-15,2024-06-20,Permanent Housing,2024-06-20,157
WFD002,Hondo,2024-02-01,,,,
WFD003,Pathway Home,2024-03-10,2024-08-15,Self-Exit,,158
```

## 🚀 Getting Started

### For Users (Jacob, Randall, Dr. Gallup)

1. **Navigate to the dashboard:**
   ```
   https://compliance.erdmethod.org/wfd/compliance
   ```

2. **Upload your Housing Tracker file:**
   - Drag and drop your Excel/CSV file
   - Or click to browse and select

3. **Review the metrics:**
   - Dashboard tab shows overview
   - Client Data tab shows all records
   - Program Performance tab compares programs
   - Data Quality tab shows MOU compliance

4. **Export data as needed:**
   - Use the Export button to download filtered data
   - All filters apply to exports

### Monthly Workflow

**Jacob (Data Manager):**
1. Export latest Housing Tracker from source system
2. Upload to `/wfd/compliance`
3. Review Data Quality tab for red/yellow fields
4. Fix source data if needed
5. Re-upload and verify green status

**Randall (Program Director):**
1. Navigate to Program Performance tab
2. Review placement rates and LoS by program
3. Identify top/bottom performers
4. Export data for board meeting

**Dr. Gallup (Compliance Officer):**
1. Check Data Quality tab monthly
2. Verify PASS status (≥80% critical fields)
3. Review any critical issues
4. Sign off on compliance

## 🛠️ Technical Setup (for Developers)

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0

### Installation

1. **Clone the repository:**
   ```bash
   cd /path/to/recovery-compass-main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   Or use the fix script:
   ```bash
   ./fix-dependencies.sh
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Visit the dashboard:**
   ```
   http://localhost:8080/wfd/compliance
   ```

### Build for Production

```bash
npm run build
npm run deploy
```

## 📁 Project Structure

```
src/
├── components/
│   ├── compliance/
│   │   ├── FileUploadInterface.tsx      # Drag-and-drop upload
│   │   ├── OverviewMetrics.tsx          # KPI cards
│   │   ├── ClientDataTable.tsx          # Sortable data table
│   │   ├── DataQualityDashboard.tsx     # MOU compliance
│   │   └── ProgramPerformanceTable.tsx  # Program comparison
│   └── wfd-suite/
│       └── WFDComplianceLayout.tsx      # Layout wrapper
├── pages/
│   └── wfd/
│       ├── ComplianceDashboard.tsx      # Main dashboard
│       ├── ClientList.tsx               # Client data view
│       ├── ProgramPerformance.tsx       # Program comparison view
│       └── DataQuality.tsx              # Quality validation view
├── stores/
│   └── complianceStore.ts               # Zustand state management
├── lib/
│   └── complianceCalculations.ts        # Business logic
└── types/
    └── compliance.ts                     # TypeScript interfaces
```

## 🧮 Calculation Logic

### Total Clients
Count of unique ClientIDs in dataset

### Active Enrollments
Records where `ExitDate` is null/blank

### Housing Placements
Records where `ExitDestination` = "Permanent Housing"

### Average Length of Stay
Mean of all `LengthOfStay` values
Auto-calculated from IntakeDate if missing

### Placement Rate
```
(Housing Placements / Total Exits) × 100
```

### Data Quality Score
```
Average coverage percentage across all required fields
```

### MOU Compliance
Pass = IntakeDate ≥ 80% AND ExitDestination ≥ 80%

## 🎨 Design System

### WFD Brand Colors
- Primary Blue: `#004B87`
- Gold Accent: `#F5A623`
- Purple: `#6B46C1`

### Data Quality Colors
- Green (≥80%): `#38A169` - Compliant
- Yellow (60-79%): `#D69E2E` - Warning
- Red (<60%): `#E53E3E` - Critical

## 🐛 Troubleshooting

### File Upload Issues
**Problem:** File won't upload
**Solution:** 
- Verify column names match exactly (case-sensitive)
- Check file isn't corrupted
- Try CSV format instead of Excel

### Calculation Issues
**Problem:** Metrics seem incorrect
**Solution:**
- Verify ExitDestination = "Permanent Housing" (exact match)
- Check date formats are ISO 8601 (YYYY-MM-DD)
- Ensure ClientID is unique per record

### Data Quality Failures
**Problem:** Compliance shows FAIL
**Solution:**
- Focus on IntakeDate and ExitDestination fields
- Must have ≥80% coverage
- Check for blank/null values in source data

### Build Errors
**Problem:** `vite` not found
**Solution:**
```bash
./fix-dependencies.sh
```

Or manually:
```bash
rm -rf node_modules package-lock.json
npm install
npm install vite@5.4.20 --save-dev
```

## 📊 Sample Data

See `sample-data/Housing_Tracker_Sample.xlsx` for a test file with:
- 30+ client records
- All 6 programs represented
- Mix of active/exited clients
- Some missing values to test validation

## 🔒 Security & Privacy

- All data processing happens client-side (browser)
- No data sent to external servers
- Files are not stored permanently
- Data clears when you upload a new file
- Use HTTPS in production

## 🤝 Support

**For Jacob (WFD Data Manager):**
- Email: jacob@whittier.org
- Questions about file format or uploads

**For Technical Issues:**
- Check troubleshooting section above
- Review error messages in upload interface
- Contact: eric@recovery-compass.org

## 📝 Version History

### v1.0.0 - October 2024
- Initial release
- Dynamic file upload
- MOU compliance tracking
- Program performance comparison
- Data quality validation
- Export functionality

## 🎯 Future Enhancements

- [ ] PDF report generation
- [ ] Email compliance reports
- [ ] Historical data comparison
- [ ] Trend analysis charts
- [ ] Mobile app version
- [ ] API integration with source systems

## 📄 License

Proprietary - Whittier First Day & Recovery Compass

## 🙏 Acknowledgments

Built for Whittier First Day by Recovery Compass
- Jacob Lozoya - Requirements and testing
- Randall Hagar - Program insights
- Dr. Larry Gallup - Compliance guidance
- Eric B. Jones - Technical implementation
