namespace StartUp
{
  partial class FormStartUp
  {
    /// <summary>
    /// Required designer variable.
    /// </summary>
    private System.ComponentModel.IContainer components = null;

    /// <summary>
    /// Clean up any resources being used.
    /// </summary>
    /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
    protected override void Dispose(bool disposing)
    {
      if (disposing && (components != null))
      {
        components.Dispose();
      }
      base.Dispose(disposing);
    }

    #region Windows Form Designer generated code

    /// <summary>
    /// Required method for Designer support - do not modify
    /// the contents of this method with the code editor.
    /// </summary>
    private void InitializeComponent()
    {
      this.button1 = new System.Windows.Forms.Button();
      this.label1 = new System.Windows.Forms.Label();
      this.numericUpDown1 = new System.Windows.Forms.NumericUpDown();
      this.buttonGoToAccountOrder = new System.Windows.Forms.Button();
      this.label2 = new System.Windows.Forms.Label();
      this.buttonGoToAccount = new System.Windows.Forms.Button();
      this.labelHello = new System.Windows.Forms.Label();
      ((System.ComponentModel.ISupportInitialize)(this.numericUpDown1)).BeginInit();
      this.SuspendLayout();
      // 
      // button1
      // 
      this.button1.Location = new System.Drawing.Point(0, 0);
      this.button1.Name = "button1";
      this.button1.Size = new System.Drawing.Size(75, 23);
      this.button1.TabIndex = 0;
      // 
      // label1
      // 
      this.label1.Location = new System.Drawing.Point(0, 0);
      this.label1.Name = "label1";
      this.label1.Size = new System.Drawing.Size(100, 23);
      this.label1.TabIndex = 0;
      // 
      // numericUpDown1
      // 
      this.numericUpDown1.Location = new System.Drawing.Point(0, 0);
      this.numericUpDown1.Name = "numericUpDown1";
      this.numericUpDown1.Size = new System.Drawing.Size(120, 20);
      this.numericUpDown1.TabIndex = 0;
      // 
      // buttonGoToAccountOrder
      // 
      this.buttonGoToAccountOrder.BackColor = System.Drawing.Color.Azure;
      this.buttonGoToAccountOrder.Location = new System.Drawing.Point(13, 65);
      this.buttonGoToAccountOrder.Name = "buttonGoToAccountOrder";
      this.buttonGoToAccountOrder.Size = new System.Drawing.Size(103, 29);
      this.buttonGoToAccountOrder.TabIndex = 9;
      this.buttonGoToAccountOrder.Text = "ورود به سفارشات";
      this.buttonGoToAccountOrder.UseVisualStyleBackColor = false;
      this.buttonGoToAccountOrder.Click += new System.EventHandler(this.buttonGoToAccountOrder_Click);
      // 
      // label2
      // 
      this.label2.AutoSize = true;
      this.label2.Location = new System.Drawing.Point(241, 71);
      this.label2.Name = "label2";
      this.label2.RightToLeft = System.Windows.Forms.RightToLeft.Yes;
      this.label2.Size = new System.Drawing.Size(80, 17);
      this.label2.TabIndex = 8;
      this.label2.Text = "ورود به سفارشات";
      this.label2.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
      // 
      // buttonGoToAccount
      // 
      this.buttonGoToAccount.BackColor = System.Drawing.Color.Azure;
      this.buttonGoToAccount.Location = new System.Drawing.Point(13, 19);
      this.buttonGoToAccount.Name = "buttonGoToAccount";
      this.buttonGoToAccount.Size = new System.Drawing.Size(103, 29);
      this.buttonGoToAccount.TabIndex = 7;
      this.buttonGoToAccount.Text = "ورود به اکانت";
      this.buttonGoToAccount.UseVisualStyleBackColor = false;
      this.buttonGoToAccount.Click += new System.EventHandler(this.buttonGoToAccount_Click);
      // 
      // labelHello
      // 
      this.labelHello.AutoSize = true;
      this.labelHello.Location = new System.Drawing.Point(256, 25);
      this.labelHello.Name = "labelHello";
      this.labelHello.RightToLeft = System.Windows.Forms.RightToLeft.Yes;
      this.labelHello.Size = new System.Drawing.Size(65, 17);
      this.labelHello.TabIndex = 6;
      this.labelHello.Text = "ورود به اکانت";
      this.labelHello.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
      // 
      // FormStartUp
      // 
      this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 17F);
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.BackColor = System.Drawing.Color.PaleTurquoise;
      this.ClientSize = new System.Drawing.Size(334, 113);
      this.Controls.Add(this.buttonGoToAccountOrder);
      this.Controls.Add(this.label2);
      this.Controls.Add(this.buttonGoToAccount);
      this.Controls.Add(this.labelHello);
      this.Font = new System.Drawing.Font("IRANSansX", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(178)));
      this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
      this.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
      this.Name = "FormStartUp";
      this.Padding = new System.Windows.Forms.Padding(10);
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
      this.Text = "choconan";
      ((System.ComponentModel.ISupportInitialize)(this.numericUpDown1)).EndInit();
      this.ResumeLayout(false);
      this.PerformLayout();

    }

    #endregion

    private System.Windows.Forms.Button button1;
    private System.Windows.Forms.Label label1;
    private System.Windows.Forms.NumericUpDown numericUpDown1;
    private System.Windows.Forms.Button buttonGoToAccountOrder;
    private System.Windows.Forms.Label label2;
    private System.Windows.Forms.Button buttonGoToAccount;
    private System.Windows.Forms.Label labelHello;
  }
}

